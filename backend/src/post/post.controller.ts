import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('posts')
  @ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiOkResponse({
    description: 'The post has been successfully created.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The post could not be created.',
    type: CreatePostDto,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    description: 'The list of posts has been successfully retrieved.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The posts could not be created.',
    type: CreatePostDto,
  })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiOkResponse({
    description: 'The post has been successfully retrieved.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The post could not be retrieved.',
    type: CreatePostDto,
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiOkResponse({
    description: 'The post has been successfully updated.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The post could not be updated.',
    type: CreatePostDto,
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiOkResponse({
    description: 'The post has been successfully deleted.',
    type: CreatePostDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request. The post could not be deleted.',
    type: CreatePostDto,
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
