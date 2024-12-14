export class MockAuthMiddleware {

    use(req: any, res: any, next: () => void) {
  
      // Middleware logic here
  
      next();
  
    }
  
  }
  