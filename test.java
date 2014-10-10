
/**
 * Write a description of class test here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */

import java.util.Date;
import java.util.ArrayList;

public class test
{

    public static void main(String[] args)
    {
        //System.out.println(new Date().toString());
        ArrayList students = new ArrayList();
        students.add(new Student("Hello", "World", 1, 7));
        students.add(new Student("Alice", "Smith", 2, 7));
        students.add(new Student("Bob", "Jones", 3, 7));
        
        Room maclab = new Room(31, students);
        
        maclab.signIn(1);
        
    }
    
}
