'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UsersController = void 0;
const common_1 = require('@nestjs/common');
const users_service_1 = require('./users.service');
const user_dto_1 = require('./user.dto');
let UsersController = class UsersController {
  constructor(userService) {
    this.userService = userService;
  }
  async login(userDto) {
    try {
      const { email, password } = userDto;
      return await this.userService.loginUser(email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw new common_1.HttpException(
        'Erro ao fazer login. Verifique suas credenciais.',
        common_1.HttpStatus.UNAUTHORIZED,
      );
    }
  }
  async logout(id) {
    try {
      await this.userService.logout(id);
      return { message: 'Logout realizado com sucesso.' };
    } catch (error) {
      console.error('Error during logout:', error);
      throw new common_1.HttpException(
        'Erro ao fazer logout.',
        common_1.HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async create(data) {
    try {
      return await this.userService.createUser(data);
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new common_1.HttpException(
        'Erro ao criar usuário.',
        common_1.HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findOne(id) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      console.error('Error during user retrieval:', error);
      throw new common_1.HttpException(
        'Usuário não encontrado.',
        common_1.HttpStatus.NOT_FOUND,
      );
    }
  }
  async getUserStatus(req) {
    const userId = req.user.id;
    const { isActive } = await this.userService.getUserStatus(userId);
    if (!isActive) {
      await this.userService.logout(userId);
      throw new common_1.HttpException(
        'Usuário desativado. Logout realizado.',
        common_1.HttpStatus.UNAUTHORIZED,
      );
    }
    return { isActive };
  }
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error('Error during users retrieval:', error);
      throw new common_1.HttpException(
        'Erro ao buscar usuários.',
        common_1.HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id, data) {
    try {
      return await this.userService.updateUser(id, data);
    } catch (error) {
      console.error('Error during user update:', error);
      throw new common_1.HttpException(
        'Erro ao atualizar usuário.',
        common_1.HttpStatus.BAD_REQUEST,
      );
    }
  }
  async desactiveUserById(id) {
    try {
      return await this.userService.desactiveUser(id);
    } catch (error) {
      console.error('Error during user deletion:', error);
      throw new common_1.HttpException(
        'Erro ao deletar usuário.',
        common_1.HttpStatus.BAD_REQUEST,
      );
    }
  }
};
exports.UsersController = UsersController;
__decorate(
  [
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [user_dto_1.UserDTO]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'login',
  null,
);
__decorate(
  [
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'logout',
  null,
);
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [user_dto_1.UserDTO]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'findOne',
  null,
);
__decorate(
  [
    (0, common_1.Get)('status'),
    __param(0, (0, common_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'getUserStatus',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, user_dto_1.UserDTO]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'update',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  UsersController.prototype,
  'desactiveUserById',
  null,
);
exports.UsersController = UsersController = __decorate(
  [
    (0, common_1.Controller)('users'),
    __metadata('design:paramtypes', [users_service_1.UsersService]),
  ],
  UsersController,
);
//# sourceMappingURL=users.controller.js.map
