import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  async signin(@Body() signinDto: SignInDto) {
    return await this.userService.signin(
      signinDto.email,
      signinDto.password,
      signinDto.nickname,
    );
  }

  @Post('signup')
  async login(@Body() signupDto: SignUpDto) {
    return await this.userService.signup(signupDto.email, signupDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getprofile(@UserInfo() user: User) {
    return user;
  }
}
