
/**
 * Write a description of class Student here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */

import java.util.Date;

public class Student
{
    // instance variables - replace the example below with your own
    private String firstName;
    private String lastName;
    private int ID;
    private int grade;
    private Date in;

    /**
     * Constructor for objects of class Student
     */
    public Student(String f, String l, int IDnum, int g)
    {
        firstName = f;
        lastName = l;
        ID = IDnum;
        grade = g;
    }

    public void setSignIn(Date i)
    {
        in = i;
    }
    public int getID()
    {
        return ID;
    }
    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public Date getSignInDate(){
        return in;
    }
}
