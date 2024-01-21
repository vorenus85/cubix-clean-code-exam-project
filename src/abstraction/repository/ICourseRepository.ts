import{ Course} from"../../models/Course";
import{ CourseStatistic} from"../../models/CourseStatistic";
import{ Student} from"../../models/Student";

export interface ICourseRepository{
    
    AddCourse(course: Course) :Promise<void>;
    AddStudentToCourse(student: Student, courseName: string):Promise<void>;
    GetCourseByName(courseName: string) : Promise<Course|undefined>;
    GetCourses():Promise<Course[]>;
    GetCourseStatistics(courseName:string) : Promise<CourseStatistic>;
}