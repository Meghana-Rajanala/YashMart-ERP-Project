
```markdown
## Usage

    ```
   Link to access the website: [https://yashmart-erp.netlify.app/](https://yashmart-erp.netlify.app/)
    ```




1. **Clone the repository to your local machine:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the development server:**

    ```bash
    npm start
    ```

5. **Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.**

## Components

### App Component

- **Description:** Main component serving as the entry point of the application.
- **Routes:**
  - `/`: Renders the homepage (HomePage component).
  - `/dashboard`: Renders the dashboard (Dashboard component).
  - `/products`: Renders the products page (Products component).
  - `/orders`: Renders the orders page (Orders component).
  - `/calendar`: Renders the calendar view (CalendarView component).

### HomePage Component

- **Description:** Displays the homepage of the application with the store name and a brief description.
- **Author:** Displays the author's name.

### Navigation Component

- **Description:** Renders navigation links to different pages of the application.

### Dashboard Component

- **Description:** Displays summary metrics like the number of products and orders.
- **Links:** Provides links to navigate to the products and orders pages.

### Products Component

- **Description:** Allows users to view, search, add, edit, and delete products.
- **Functionality:**
  - Search: Allows users to search for products by name or category.
  - Add: Enables users to add new products.
  - Edit: Allows users to edit existing product details.
  - Delete: Allows users to delete products from the list.

### Orders Component

- **Description:** Displays a list of orders and allows users to view, edit, delete, and update the status of orders.
- **Functionality:**
  - View: Allows users to view order details.
  - Edit: Enables users to edit order details.
  - Delete: Allows users to delete orders.
  - Update Status: Allows users to update the status of orders.

### CalendarView Component

- **Description:** Displays orders on a calendar view.
- **Functionality:**
  - Calendar: Allows users to select a date to view orders scheduled for that date.
  - Orders: Displays orders scheduled for the selected date.

## Styling

- **Common Styles:** Contains common styles used across components.
- **Dashboard Styles:** Contains styles specific to the dashboard component.
- **Product Styles:** Contains styles specific to the products component.
- **Order Styles:** Contains styles specific to the orders component.
- **Calendar Styles:** Contains styles specific to the calendar view component.
- **Navigation Styles:** Contains styles for navigation links.

## Credits

- **Author:** Meghana Rajanala
```