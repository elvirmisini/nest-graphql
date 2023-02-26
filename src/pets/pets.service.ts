import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm/repository/Repository';
import { createPetInput } from './dto/create-pet.input';
import { Pet } from './pets.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsReporsitory: Repository<Pet>,
        private ownerService: OwnersService) { }


    async createPet(createPetInput: createPetInput): Promise<Pet> {
        const newPet = this.petsReporsitory.create(createPetInput)
        return this.petsReporsitory.save(newPet)
    }

    async findAll(): Promise<Pet[]> {
        return this.petsReporsitory.find()
    }

    async findOne(id: number): Promise<Pet> {
        return await this.petsReporsitory.findOneOrFail({
            where: { id },

        })
        //test
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownerService.findOne(ownerId)
    }
}
