import { Controller } from "@/application/controllers";
import { Validation } from "@/application/validation";
import { HttpResponse, badRequest, ok } from "@/application/helpers";
import { UserRepository } from "@/infra/repositories/mysql/user-repository";
import { Hasher } from "@/domain/contracts/cryptography";

type HttpRequest = {
  params: { id: number };
  name?: string;
  email?: string;
  roleId?: number;
  isActive?: boolean;
  password?: string
};

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);

    if (error) {
      return badRequest(error);
    }

    if (httpRequest.password) {
      httpRequest.password = await this.hasher.hash(httpRequest.password)
    }

    const user = await this.userRepository.update({
      id: httpRequest.params.id,
      name: httpRequest.name,
      email: httpRequest.email,
      roleId: httpRequest.roleId,
      isActive: httpRequest.isActive,
      password: httpRequest.password
    });

    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      isActive: user.isActive,
    });
  }
}
