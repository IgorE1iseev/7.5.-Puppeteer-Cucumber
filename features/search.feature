Feature: Search a course
    
    Scenario: Cinema ticket reservation app
        Given users is on "https://qamid.tmweb.ru/client/index.php" page
        When The first user chooses the day
        When The first user chooses time and cinema hall
        When The first user chooses a seat 6 row 5
        When The first user clicks reservation button
        Then The first user sees the title "Вы выбрали билеты:"
    
    Scenario: Should reservate ticket for VIP seat for Mickey Mouse
        Given users is on "https://qamid.tmweb.ru/client/index.php" page
        When The second user chooses the day 
        When The second user chooses time and cinema hall
        When The second user chooses a VIP seat 3 row 4
        When The second user clicks reservation button
        Then The second user sees the price "Стоимость: 3500 руб."
    
    Scenario: Shouldn't reservate already taken seat for Stalker
        Given users is on "https://qamid.tmweb.ru/client/index.php" page
        When The third user chooses the day 
        When The third user chooses time and cinema hall
        When The third user chooses an already reservated seat 4 row 1
        When The third user clicks reservation button
        Then reservation button is non-active
