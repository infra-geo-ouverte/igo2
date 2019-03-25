export class FeatureImportError extends Error {}

export class FeatureImportInvalidFileError extends FeatureImportError {
  constructor() {
    super('Invalid file.');
    Object.setPrototypeOf(this, FeatureImportInvalidFileError.prototype);
  }
}

export class FeatureImportUnreadableFileError extends FeatureImportError {
    constructor() {
      super('Failed to read file.');
      Object.setPrototypeOf(this, FeatureImportUnreadableFileError.prototype);
    }
  }
