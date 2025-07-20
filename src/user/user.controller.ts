import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.userService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() req: any) {
    return this.userService.getUserById(req.user.id);
  }
}
