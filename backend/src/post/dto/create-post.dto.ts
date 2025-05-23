import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";


export class CreatePostDto {

    @ApiProperty({ example: 'My first post', description: 'The title of the post' })
    @IsNotEmpty({ message: 'Title is required' })
    @Length(3, 100, {message: 'Title must be between 3 and 100 characters'})
    title: string;

    @ApiProperty({ example: 'This is the content...', description: 'The body of the post' })
    @IsNotEmpty({message: 'Content is required'})
    content: string;

    @ApiProperty({ example: 'uuid-of-user', description: 'ID of the post author' })
    @IsNotEmpty({message: 'Author ID is required'})
    authorId: string;
 }
