import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({
    description: 'The user has been successfully created.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The user could not be created.',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'The list of users has been successfully retrieved.',
    type: [CreateUserDto],
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The users could not be retrieved.',
    type: CreateUserDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The user could not be retrieved.',
    type: CreateUserDto,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiOkResponse({
    description: 'The user has been successfully updated.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The user could not be updated.',
    type: CreateUserDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The user could not be deleted.',
    type: CreateUserDto,
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
