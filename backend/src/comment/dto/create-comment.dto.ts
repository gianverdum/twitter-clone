import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";


export class CreateCommentDto {

    @ApiProperty({ example: 'This is the content...', description: 'The body of the comment' })
    @IsNotEmpty({ message: 'Comment is required' })
    @Length(1, 200, { message: 'Comment must be between 1 and 200 charcters' })
    comment: string;

    @ApiProperty({ example: 'uuid-of-post', description: 'ID of the post' })
    @IsNotEmpty({message: 'Author ID is required'})
    postId: string;

    @ApiProperty({ example: 'uuid-of-user', description: 'ID of the comment author' })
    @IsNotEmpty({message: 'Author ID is required'})
    authorId: string;
 }
