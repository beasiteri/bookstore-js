# MONGO DB
1. Create routes to do CRUD actions to the mongo collections (you can see examples in pnb on how we create routes and register them in the server).
Do not use the test module because it was just an exemple. Create new files and folder in the best way you can think of to have it all organised. (again you can take examples in pnb but you don't have to do exactly the same because pnb is not perfect :)
The mongo collections for now are:
- book (with properties: title, writer, publish_date)
- customer (with properties: last_name, first_name, email, phone, address, postal_code, city, subscribe_date)
- invoice (with properties: number, customer_id, date, total_price, items (items is an array, for now leave it empty))
Don't forget to create the collections in robomongo before.
Note: when you create a new object in a collection, the _id is created automatically so you don't have to create it

2. Add a UI section that will allow you to use these CRUD routes for each entity. Do it in the way you see fit. You should be able from the UI to:
- List all the entries of each entities (ie: list all the books)
- create a new entity (with a input where you can enter the property values you want to create)
- delete an entity
- update an entity's property

# SQL
- create a sql-connection.js file in the modules folder. It should have the same goal as the mongo-connection.js except that it will make a SQL connection to your local database.
- in your local sql database, create a new database called "library", in it you can create these tables:
1. "event". Properties (property kind):
  - "pk" (unique, auto-incremented)
  - "name" (varchar)
  - "description" (long text)
  - "date" (date)
  - "address" (varchar)
  - "city" (foreign key refering to table "city")
2. "city". Properties (property kind):
  - "pk" (unique, auto-incremented)
  - "name" (varchar)
  - "country" (foreign key refering to table "country")
3. "country". Properties (property kind):
  - "pk" (unique, auto-incremented)
  - "name" (string)
Don't forget to apply the foreign key references in dbeaver :-). To check that it works, in dbeaver you can try to do a select all on the event and join table city and country so that your query would return the city name and the country name in the event list.
- Create a new page/section on the UI which would display the events in some kind of a calendar (nothing too fancy, I hope you can find some ready made bootstrap thing. Or maybe a jquery plugin, otherwise just do some squares for each day). On the calendar/agenda, we would only see the name of the event in the day box. And when we would hover (or click) on the event, a little box would popout and in that box we could have the info related to the event, with the address (city name and country)
