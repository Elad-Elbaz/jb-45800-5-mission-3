import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Team from "./Team";

@Table({
    underscored: true
})
export default class Meeting extends Model {

    @PrimaryKey 
    @AutoIncrement
    @Column(DataType.INTEGER)   
    id: number;

    @ForeignKey(() => Team)
    @AllowNull(false)
    @Column(DataType.INTEGER)   
    teamId: number;

    @BelongsTo(() => Team)
    team: Team;

    @AllowNull(false)
    @Column(DataType.DATE)
    startTime: Date;

    @AllowNull(false)
    @Column(DataType.DATE)   
    endTime: Date;

    @AllowNull(false)
    @Column(DataType.TEXT)   
    description: string;

    @AllowNull(false)
    @Column(DataType.STRING)   
    room: string;
}