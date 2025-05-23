import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';


export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsNotEmpty({ message: 'The field name is required' })
    @IsString()
    @Length(3, 100, { message: 'The name must be between 3 and 100 characters' })
    name: string;

    @ApiProperty({ example: 'email@email.com', description: 'The email of the user' })
    @IsNotEmpty({ message: 'The field email is required' })
    @IsEmail({},{ message: 'Invalid email provided' })
    email: string;

    @ApiProperty({ example: 'P4$$word', description: 'User password' })
    @IsNotEmpty()
    @Length(8, 32, { message: 'The password must be between 8 and 32 characters long.' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        {
          message:
            'The password must include upper case, lower case, number and special character.',
        },
      )
    password: string;
}
