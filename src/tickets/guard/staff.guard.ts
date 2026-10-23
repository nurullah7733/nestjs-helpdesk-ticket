import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const staffHeaderKey = request.headers['x-staff-key'];
    if (staffHeaderKey !== 'test-staff-key') {
      throw new ForbiddenException('Invalid staff key');
    }
    return true;
  }
}
