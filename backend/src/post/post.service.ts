import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PostReadDto } from './dto/post-read.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const author = await this.userRepository.findOneBy({ id: createPostDto.authorId });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const post = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      author,
    });

    return this.postRepository.save(post);
  }

  async findAll(): Promise<PostReadDto[]> {
    const posts = await this.postRepository.find({ relations: ['author', 'comments', 'comments.author'] });

    return plainToInstance(PostReadDto, posts, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<PostReadDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return plainToInstance(PostReadDto, post, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);

    return this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author']
    });

    if (!post) throw new NotFoundException('Post not found');

    await this.postRepository.remove(post);
  }
}
