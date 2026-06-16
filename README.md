# WEB103 Project 2 - *Tavern Codex: A Baldur's Gate 3 Companion Guide*

Submitted by: **David Odejimi**

About this web app: **The web app will be a Baldur’s Gate-themed character codex that displays unique characters as fantasy-style cards. Each card will show the character’s name, race, class, role, and short description. When a user clicks a card, they will be taken to a detailed page with all character information from the database.**


Time spent: **2.5** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [X] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [X]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**


The following **optional** features are implemented:

- [X] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

**Note: please be sure to 

Here's a walkthrough of implemented required features:

<img src='./client/src/assets/images/Tavern Code 2.gif.gif' title='Video Walkthrough' width='800' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
getkap
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Two challenges I encountered while building the app were connecting the PostgreSQL database and getting the database schema to work correctly. After troubleshooting the connection settings and schema file, I was able to fix the issue and successfully load the character data. Another challenge happened when I added the search feature. The search results kept returning all 12 characters even when I searched for one specific character or class. I discovered that the issue was in my character routes, because the route was returning every character instead of filtering the database results based on the search request. Once I updated the route logic, the search feature worked correctly.

## License

Copyright [2026] [David Odejimi]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
