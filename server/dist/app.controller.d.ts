import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        expires_in: string;
    }>;
    register(user: User): Promise<void>;
    uploadedFile(file: any): Promise<{
        originalname: any;
        filename: any;
    }>;
    getFile(image: any, res: any): any;
    getProfile(req: any): any;
}
