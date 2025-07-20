import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ZapService } from './Zap.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ZapCreateSchema } from './dto/create-zap.dto';
import { Request, Response } from 'express';

@Controller('zap')
export class ZapController {
  
  constructor(private readonly zapService: ZapService) {}

@Post()
@UseGuards(JwtAuthGuard)
async createZap(@Req() req: Request, @Res() res: Response) {
    const parsed = ZapCreateSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.json({ message: 'Incorrect inputs' });
    }

    const userId = parseInt((req as any).user.id); // set by AuthGuard
    const zapId = await this.zapService.createZap(userId, parsed.data);
    return res.json({ zapId });
  }

@Get()
@UseGuards(JwtAuthGuard)
async getUserZaps(@Req() req: Request, @Res() res: Response) {
  const userId = parseInt((req as any).user.id); // AuthGuard sets this
  const zaps = await this.zapService.getZapsByUser(userId);
  return res.json({ zaps });
}
  @Get('outofbox')
  @UseGuards(JwtAuthGuard)
  async getAllOutbox() {
    const records = await this.zapService.getAll();
    return { records };
  }

  @Post('hooks/catch/:userId/:zapId')
  async catchHook(
    @Param('userId') userId: string,
    @Param('zapId') zapId: string,
    @Body() body: any,
    @Res() res: Response
  ) {
    try {
      // Delegating logic to service
      await this.zapService.processWebhook(userId, zapId, body);

      // Success response
      return res.json({ message: 'Webhook received successfully' });
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

@Get('run/:id')
@UseGuards(JwtAuthGuard)
async getZapRunById(@Param('id') id: string, @Res() res: Response) {
  try {
    const zapRun = await this.zapService.getZapRunById(id);

    if (!zapRun) {
      return res.status(404).json({ message: 'ZapRun not found' });
    }

    return res.json({ zapRun });
  } catch (err) {
    console.error('Error fetching ZapRun:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
   @Post('watsapp')
  async sendWhatsApp(
    @Body() body: { to: string; contentSid: string; variables: Record<string, string> },
    @Res() res: Response
  ) {
    try {
      const sid = await this.zapService.sendTemplateMessage(
        body.to,
        body.contentSid,
        body.variables
      );
      return res.status(200).json({ sid });
    } catch (error) {
      console.error('❌ Error sending WhatsApp:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}