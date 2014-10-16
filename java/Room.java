
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
        inactive = students;
    }

    public void signIn(int id, int computer)
    {
        Student s = findInactiveStudent(id);
        if(s == null){
            System.out.println("Error: could not find student.");
        } else {
            s.setSignIn(new Date());
            activateStudent(s,computer);
            inactive.remove(s);
            System.out.println(s.getFirstName() + " " + s.getLastName() + " was successfully signed in.");
            System.out.println(s.getSignInDate().toString());
        }
    }
    
    public Student findInactiveStudent(int id){
        for(int n = 0; n < inactive.size(); n++){
            Student s = (Student)inactive.get(n);
            if(s.getID() == id) return s;
        }
        return null;
    }
    
    public void activateStudent(Student s, int computer){
        active[computer - 1] = s;
    }
}
