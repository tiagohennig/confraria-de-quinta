export class CustomError extends Error {
  public statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InvalidInput extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}

export class NotFound extends CustomError {
  constructor(message: string) {
    super(404, message);
  }
}

export class Unauthorized extends CustomError {
  constructor() {
    super(401, "Unauthorized");
  }
}

export class Forbidden extends CustomError {
  constructor() {
    super(403, "Forbidden");
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string) {
    super(500, `Database error: ${message}`);
  }
}