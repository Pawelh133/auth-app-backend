import { AssignableObject } from "../../../../utils/object-operations/assignable-object";
import { User } from "../../../../modules/database/entities/user.entity";

export class ProfileResponseDto extends AssignableObject {
  constructor(data: Partial<User>) {
    super();

    this.assignIfExists(data.email, 'email');
    this.assignIfExists(data.name, 'name');
  }

  readonly email: string;
  readonly name?: string;
}
