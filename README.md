# Effector workshop

This is an educational app based on effector. We'll go step by step building it from starter boilerplate.
It's about small MVP for conference rooms.

[RU] [Workshop video](https://youtu.be/sn9yszY7gn0?t=1568)

## Functionality

- Google login/email login to authenticate user
- Simple routing. Two routes `/` for login and `/theater` which one as authenticated i.e. user can go into this page only if user is logged in
- Once user is authenticated, users will be redirected into this theater page
- Users can go into any table and their avatars will be shown as below.
![Map](https://github.com/YanLobat/effector-workshop/blob/master/Map-with%20users.png)
- Assign a table to the user when they land on this page
- Assignment logic: First user will go into first table, second user will be paired with first user in first table. Third user will go into second table and fourth will be paired with third user in second table. Once all the tables have 2 people, next incoming user will go into first table and then second and so on.
- Users can switch table at any point of time
- If user refreshes the browser at any point of time, they should land on same table
- At any point of time, one user can be in only one room
- When a table is full and new user tries to enter, show error notification
- When all tables are full show error notification after login attempt

## Bonus
- Could test max capacity in chapter6
