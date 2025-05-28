import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const access_token = await this.authService.login(loginDto)
        const user = await this.userService.findByEmail(loginDto.email)

        return { access_token, user }
    }
}
