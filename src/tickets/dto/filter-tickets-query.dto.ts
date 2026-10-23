import { IsOptional, IsIn } from 'class-validator';
import { Ticket } from '../ticket.interface.js';

export class FilterTicketsQueryDto {
  @IsOptional()
  @IsIn(['open', 'closed'])
  status?: Ticket['status'];

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: Ticket['priority'];
}
