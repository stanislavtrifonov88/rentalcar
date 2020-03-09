import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Module({
    imports: [],
    controllers: [],
    providers: [CalculationService],
})

export class CalculationModule {}