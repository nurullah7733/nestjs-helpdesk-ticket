import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { Ticket } from '../ticket.interface.js';

export class TicketsDto {
  @IsString({ message: 'Subject must be a string' })
  @IsNotEmpty({ message: 'Subject cannot be empty' })
  subject: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsString({ message: 'Priority must be a string' })
  @IsIn(['low', 'medium', 'high'])
  priority: Ticket['priority'];
}
