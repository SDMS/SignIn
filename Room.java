
/**
 * Write a description of class Room here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
import java.util.Date;
import java.util.ArrayList;

public class Room
{
    // instance variables - replace the example below with your own
    private Student[] active;
    private ArrayList inactive;

    /**
     * Constructor for objects of class Room
     */
    public Room(int numComputers, ArrayList students)
    {
        active = new Student[numComputers];
        inactive = new ArrayList();
    }

    public void signIn(int id)
    {
        //
    }
}
