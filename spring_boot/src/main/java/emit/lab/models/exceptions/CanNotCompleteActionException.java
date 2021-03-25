package emit.lab.models.exceptions;

public class CanNotCompleteActionException extends RuntimeException {
    public CanNotCompleteActionException(String message) {
        super(message);
    }
}