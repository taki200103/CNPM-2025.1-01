"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHouseholdDto = exports.CreateHouseholdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateHouseholdDto {
    apartmentId;
    contractStartDate;
    contractEndDate;
    ownerId;
}
exports.CreateHouseholdDto = CreateHouseholdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-apartment-id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHouseholdDto.prototype, "apartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHouseholdDto.prototype, "contractStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHouseholdDto.prototype, "contractEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-owner-id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHouseholdDto.prototype, "ownerId", void 0);
class UpdateHouseholdDto {
    apartmentId;
    contractStartDate;
    contractEndDate;
    ownerId;
}
exports.UpdateHouseholdDto = UpdateHouseholdDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-apartment-id', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHouseholdDto.prototype, "apartmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01', required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateHouseholdDto.prototype, "contractStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-01', required: false }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateHouseholdDto.prototype, "contractEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-owner-id', required: false }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateHouseholdDto.prototype, "ownerId", void 0);
//# sourceMappingURL=household.dto.js.map