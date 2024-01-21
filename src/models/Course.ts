import{ Student} from"./Student";

export class Course{ private students:Student[] =[];
    constructor( 
        private courseName: string, 
        private startDate: Date, 
        private lengthInWeeks: number, 
        private costInHuf: number) { }
    }