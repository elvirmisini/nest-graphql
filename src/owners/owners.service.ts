import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(@InjectRepository(Owner) private ownerReporsitory: Repository<Owner>) { }

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerReporsitory.create(createOwnerInput)

    return this.ownerReporsitory.save(newOwner)
  }

  findAll() {
    return this.ownerReporsitory.find()
  }

  findOne(id: number) {
    return this.ownerReporsitory.findOneOrFail({
      where: { id },
    })
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerReporsitory.save({
      id: id,
      name: updateOwnerInput.name,
    });
  }

  remove(id: number) {
    return this.ownerReporsitory.delete(id);
  }
}
