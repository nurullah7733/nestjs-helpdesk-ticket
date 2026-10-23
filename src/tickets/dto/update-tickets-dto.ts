import { IsString, IsOptional, IsIn, IsEmpty } from 'class-validator';
import { Ticket } from '../ticket.interface.js';

export class UpdateTicketsDto {
  @IsString()
  @IsOptional()
  @IsEmpty()
  subject?: string;

  @IsString()
  @IsOptional()
  @IsEmpty()
  description?: string;

  @IsIn(['low', 'medium', 'high'])
  @IsOptional()
  priority?: Ticket['priority'];
}
