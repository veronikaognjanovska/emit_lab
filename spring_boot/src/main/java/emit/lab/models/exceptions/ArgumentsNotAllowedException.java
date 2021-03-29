package emit.lab.models.exceptions;

public class ArgumentsNotAllowedException extends RuntimeException {
    public ArgumentsNotAllowedException() {
        super("Arguments not allowed!");
    }
}