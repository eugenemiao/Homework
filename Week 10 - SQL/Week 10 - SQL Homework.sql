use sakila

-- 1a. Display the first and last names of all actors from the table actor.
select first_name, last_name
from actor

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
select concat(first_name,' ',last_name) as Actor_Name from actor

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
select actor_id, first_name, last_name
from actor
having first_name = "Joe";

-- 2b. Find all actors whose last name contain the letters GEN:
select first_name, last_name from actor where last_name like "%GEN%"

-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
select last_name, first_name from actor where last_name like "%LI%"

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
select country_id, country from country where country in ("Afghanistan", "Bangladesh", "China")

-- 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
alter table actor
add column middle_name varchar(20) AFTER first_name

select * from actor

-- 3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs.
alter table actor
modify middle_name blob

-- 3c. Now delete the middle_name column.
alter table actor
drop column middle_name


-- 4a. List the last names of actors, as well as how many actors have that last name.
select last_name, count(*) from actor group by last_name

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
select last_name, count(*) from actor group by last_name having count(*) >= 2;

-- 4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
update actor set first_name = "Harpo" where first_name = "Groucho" AND last_name = "Williams"

select * from actor where first_name = "Harpo"

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error.
-- BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO MUCHO GROUCHO, HOWEVER! (Hint: update the record using a unique identifier.)
update actor set first_name = "Groucho" where first_name = "Harpo"

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
show create table address

-- Hint: https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
select staff.first_name, staff.last_name, address.address
from staff
left join address on staff.address_id = address.address_id

-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
select staff.first_name, staff.last_name, sum(payment.amount)
from payment
join staff on staff.staff_id = payment.staff_id
group by staff.last_name

-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
select film.title, count(film_actor.actor_id)
from film
inner join film_actor on film.film_id = film_actor.film_id
group by film.title

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
select count(inventory.film_id)
from inventory
where film_id in(
	select film_id
    from film
    where title like "Hunchback Impossible"
);

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:
select customer.first_name, customer.last_name, sum(payment.amount)
from customer
inner join payment on payment.customer_id = customer.customer_id
group by customer.last_name

-- ![Total amount paid](Images/total_payment.png)

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, 
-- films starting with the letters K and Q have also soared in popularity.
-- Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
select * from film where title like 'K%' or 'Q%'

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.
select first_name, last_name
from actor 
where actor_id in(
	select actor_id
    from film_actor
    where film_id in(
		select film_id
        from film
        where title like "Alone Trip"
	)
);

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers.
-- Use joins to retrieve this information.
select first_name, last_name, email
from customer
where address_id in(
	select address_id
    from address
    where city_id in(
		select city_id
        from city
        where country_id in(
			select country_id
            from country
            where country like "Canada"
		)
	)
);

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films.
select title
from film
where film_id in(
	select film_id
    from film_category
    where category_id in(
		select category_id
        from category
        where name like "Family"
	)
);

-- 7e. Display the most frequently rented movies in descending order.
select * from rental
select * from inventory
select * from film

select film.title, rental.inventory_id, count(*)
from rental
inner join inventory on inventory.inventory_id = rental.inventory_id
inner join film on film.film_id = inventory.film_id
group by rental.inventory_id
order by count(*) desc

-- 7f. Write a query to display how much business, in dollars, each store brought in.
select * from payment
select * from store
select * from customer

select staff_id as Store, sum(amount) as Total_Business
from payment
inner join store on payment.staff_id = store.store_id
group by payment.staff_id

-- 7g. Write a query to display for each store its store ID, city, and country.
select * from store -- store_id, address_id
select * from address -- address_id, city_id
select * from city -- city_id, city, country_id
select * from country -- country_id, country

select store.store_id as Store_ID, city.city, country.country
from store
inner join address on store.address_id = address.address_id
inner join city on address.city_id = city.city_id
inner join country on city.country_id = country.country_id
    
SELECT  a.*, b.*
FROM    tbl_customers a
            INNER JOIN tbl_emails_sent b
                ON a.customerid = b.customerid
            INNER JOIN
            (
                SELECT      customerid, MAX(datesent) maxSent
                FROM        tbl_emails_sent
                GROUP BY    customerid
            ) c ON  c.customerid = b.customerid AND
                    c.maxSent = b.datesent

-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
select * from category
select * from film_category
select * from inventory -- inventory_id, film_id, store_id
select * from rental -- rental_id, inventory_id, customer_id
select * from payment -- payment_id, customer_id, staff_id, rental_id, amount

select category.name as Name, sum(payment.amount) as Gross_Revenue
from category
inner join film_category on category.category_id = film_category.category_id
inner join inventory on inventory.film_id = film_category.film_id
inner join rental on rental.inventory_id = inventory.inventory_id
inner join payment on payment.rental_id = rental.rental_id
group by category.name

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
-- Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.


-- 8b. How would you display the view that you created in 8a?
-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.