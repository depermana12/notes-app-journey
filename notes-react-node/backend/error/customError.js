export class CustomError extends Error {
  constructor(message, status, type) {
    super(message);
    this.status = status;
    this.type = type;
  }
}

export class DatabaseError extends CustomError {
  constructor(message) {
    super(message, 500, "DatabaseError");
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404, "NotFoundError");
  }
}

export class ConflictError extends CustomError {
  constructor(message) {
    super(message, 409, "ConflictError");
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401, "UnauthorizedError");
  }
}

export class FileTypeError extends CustomError {
  constructor(message) {
    super(message, 400, "FileTypeError");
  }
}

export class UploadError extends CustomError {
  constructor(message) {
    super(message, 400, "UploadError");
  }
}
