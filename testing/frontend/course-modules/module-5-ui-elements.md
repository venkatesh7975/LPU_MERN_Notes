# Module 5: Testing UI Elements

## 🎯 Learning Objectives
- Master React Testing Library query methods
- Learn when to use different query types
- Understand accessibility-first testing
- Practice testing complex UI interactions
- Learn debugging techniques with `screen.debug()`

## 🔍 React Testing Library Query Methods

### Query Priority (Recommended Order)

1. **getByRole** - Most accessible and recommended
2. **getByLabelText** - For form elements
3. **getByPlaceholderText** - For inputs without labels
4. **getByText** - For text content
5. **getByDisplayValue** - For form values
6. **getByTestId** - Last resort, when other queries don't work

### 1. getByRole Queries

```javascript
// Buttons
screen.getByRole('button');
screen.getByRole('button', { name: 'Submit' });

// Form elements
screen.getByRole('textbox');
screen.getByRole('textbox', { name: 'Email' });
screen.getByRole('checkbox');
screen.getByRole('radio');

// Navigation
screen.getByRole('link');
screen.getByRole('link', { name: 'Home' });

// Headings
screen.getByRole('heading');
screen.getByRole('heading', { name: 'Welcome' });
screen.getByRole('heading', { level: 1 });

// Lists
screen.getByRole('list');
screen.getByRole('listitem');
```

### 2. getByLabelText Queries

```javascript
// For labeled form elements
screen.getByLabelText('Email');
screen.getByLabelText('Password');
screen.getByLabelText('Remember me');

// With partial matching
screen.getByLabelText(/email/i);
```

### 3. getByText Queries

```javascript
// Exact text
screen.getByText('Hello World');

// Partial text
screen.getByText(/hello/i);

// Function matcher
screen.getByText((content, element) => {
  return element.tagName.toLowerCase() === 'span' && content.includes('Hello');
});
```

### 4. getByTestId Queries

```javascript
// When other queries don't work
screen.getByTestId('submit-button');
screen.getByTestId('user-avatar');
```

## 🎯 Interactive Exercise: Testing a Complex UI Component

Let's create a comprehensive user profile component and test all its UI elements!

### Step 1: Create a User Profile Component

Create `src/components/UserProfile.jsx`:

```jsx
import React, { useState } from 'react';

const UserProfile = ({ user, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    bio: user.bio || '',
    avatar: user.avatar || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      bio: user.bio || '',
      avatar: user.avatar || ''
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="user-profile" data-testid="user-profile">
        <h1>Edit Profile</h1>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              data-testid="name-input"
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              data-testid="email-input"
            />
          </div>

          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              data-testid="bio-textarea"
            />
          </div>

          <div>
            <label htmlFor="avatar">Avatar URL:</label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              data-testid="avatar-input"
            />
          </div>

          <div className="button-group">
            <button 
              type="submit" 
              data-testid="save-button"
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              data-testid="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="user-profile" data-testid="user-profile">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button 
          onClick={() => setIsEditing(true)}
          data-testid="edit-button"
        >
          Edit Profile
        </button>
      </div>

      <div className="profile-content">
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={`${user.name}'s avatar`}
            data-testid="user-avatar"
          />
        )}

        <div className="profile-info">
          <h2 data-testid="user-name">{user.name || 'No name provided'}</h2>
          <p data-testid="user-email">{user.email || 'No email provided'}</p>
          <p data-testid="user-bio">{user.bio || 'No bio provided'}</p>
        </div>

        <div className="profile-actions">
          <button 
            onClick={() => onDelete(user.id)}
            data-testid="delete-button"
            className="delete-button"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
```

### Step 2: Write Comprehensive UI Tests

Create `src/__tests__/UserProfile.test.jsx`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../components/UserProfile';

describe('UserProfile Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
    avatar: 'https://example.com/avatar.jpg'
  };

  const mockOnSave = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockOnDelete.mockClear();
  });

  // Test rendering in view mode
  test('renders user information in view mode', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    // Test headings
    expect(screen.getByRole('heading', { name: 'User Profile' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'John Doe' })).toBeInTheDocument();

    // Test user info
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('user-email')).toHaveTextContent('john@example.com');
    expect(screen.getByTestId('user-bio')).toHaveTextContent('Software developer');

    // Test avatar
    const avatar = screen.getByTestId('user-avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('alt', "John Doe's avatar");
  });

  test('renders edit button in view mode', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit Profile' });
    expect(editButton).toBeInTheDocument();
  });

  test('renders delete button in view mode', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete Profile' });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass('delete-button');
  });

  // Test switching to edit mode
  test('switches to edit mode when edit button is clicked', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    const editButton = screen.getByRole('button', { name: 'Edit Profile' });
    fireEvent.click(editButton);

    // Should show edit form
    expect(screen.getByRole('heading', { name: 'Edit Profile' })).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('bio-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-input')).toBeInTheDocument();
  });

  // Test form inputs in edit mode
  test('populates form fields with user data in edit mode', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    // Switch to edit mode
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    // Check form values
    expect(screen.getByTestId('name-input')).toHaveValue('John Doe');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
    expect(screen.getByTestId('bio-textarea')).toHaveValue('Software developer');
    expect(screen.getByTestId('avatar-input')).toHaveValue('https://example.com/avatar.jpg');
  });

  // Test form interactions
  test('updates form values when user types', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    // Switch to edit mode
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    // Update name field
    const nameInput = screen.getByTestId('name-input');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(nameInput).toHaveValue('Jane Doe');

    // Update email field
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    expect(emailInput).toHaveValue('jane@example.com');
  });

  // Test form submission
  test('calls onSave with updated data when save button is clicked', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    // Switch to edit mode
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    // Update form data
    fireEvent.change(screen.getByTestId('name-input'), { 
      target: { value: 'Jane Doe' } 
    });
    fireEvent.change(screen.getByTestId('email-input'), { 
      target: { value: 'jane@example.com' } 
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      bio: 'Software developer',
      avatar: 'https://example.com/avatar.jpg'
    });
  });

  // Test cancel functionality
  test('resets form and returns to view mode when cancel is clicked', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    // Switch to edit mode
    fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));

    // Change form data
    fireEvent.change(screen.getByTestId('name-input'), { 
      target: { value: 'Changed Name' } 
    });

    // Cancel
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    // Should be back in view mode with original data
    expect(screen.getByRole('heading', { name: 'User Profile' })).toBeInTheDocument();
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
  });

  // Test delete functionality
  test('calls onDelete when delete button is clicked', () => {
    render(
      <UserProfile 
        user={mockUser} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete Profile' });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  // Test edge cases
  test('handles user with missing data', () => {
    const userWithMissingData = {
      id: 2,
      name: '',
      email: '',
      bio: '',
      avatar: ''
    };

    render(
      <UserProfile 
        user={userWithMissingData} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByTestId('user-name')).toHaveTextContent('No name provided');
    expect(screen.getByTestId('user-email')).toHaveTextContent('No email provided');
    expect(screen.getByTestId('user-bio')).toHaveTextContent('No bio provided');
    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
  });

  test('handles user without avatar', () => {
    const userWithoutAvatar = {
      ...mockUser,
      avatar: ''
    };

    render(
      <UserProfile 
        user={userWithoutAvatar} 
        onSave={mockOnSave} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
  });
});
```

## 🎯 Debugging with screen.debug()

### Using screen.debug()

```javascript
test('debug example', () => {
  render(<UserProfile user={mockUser} onSave={mockOnSave} onDelete={mockOnDelete} />);
  
  // Debug the entire document
  screen.debug();
  
  // Debug a specific element
  screen.debug(screen.getByRole('button'));
  
  // Debug with pretty printing
  screen.debug(undefined, { depth: null, colors: true });
});
```

### Common Debugging Scenarios

```javascript
// When element is not found
test('debugging missing element', () => {
  render(<UserProfile user={mockUser} onSave={mockOnSave} onDelete={mockOnDelete} />);
  
  // This will help you see what's actually rendered
  screen.debug();
  
  // Then try to find the element
  expect(screen.getByText('Non-existent text')).toBeInTheDocument();
});
```

## 🎯 Best Practices for UI Testing

### 1. Use Semantic Queries

```javascript
// ✅ Good - Uses semantic role
screen.getByRole('button', { name: 'Submit' });

// ❌ Bad - Uses test ID when semantic query works
screen.getByTestId('submit-button');
```

### 2. Test Accessibility

```javascript
test('form has proper labels', () => {
  render(<LoginForm />);
  
  // Check that inputs have associated labels
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});
```

### 3. Test User Workflows

```javascript
test('complete user workflow', () => {
  render(<UserProfile user={mockUser} onSave={mockOnSave} onDelete={mockOnDelete} />);
  
  // 1. User sees profile
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  
  // 2. User clicks edit
  fireEvent.click(screen.getByRole('button', { name: 'Edit Profile' }));
  
  // 3. User fills form
  fireEvent.change(screen.getByTestId('name-input'), { 
    target: { value: 'Jane Doe' } 
  });
  
  // 4. User saves
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  
  // 5. Verify result
  expect(mockOnSave).toHaveBeenCalledWith(
    expect.objectContaining({ name: 'Jane Doe' })
  );
});
```

## 🎯 Checkpoint Quiz

### Question 1: Which query method is most recommended for accessibility?
- A) `getByTestId`
- B) `getByRole`
- C) `getByText`
- D) `getByLabelText`

**Answer: B** - `getByRole` is most recommended as it promotes accessibility-first testing.

### Question 2: When should you use `getByTestId`?
- A) Always
- B) Never
- C) Only when other semantic queries don't work
- D) Only for buttons

**Answer: C** - `getByTestId` should be used as a last resort when other semantic queries don't work.

### Question 3: What does `screen.debug()` do?
- A) Runs tests faster
- B) Shows the current DOM structure in console
- C) Fixes broken tests
- D) Generates test reports

**Answer: B** - `screen.debug()` shows the current DOM structure in the console for debugging.

## 🚀 Practice Exercise

**Your Turn!** Create a `TodoList` component and test all its UI elements:

1. Create a `TodoList` component with:
   - List of todo items
   - Add new todo form
   - Delete todo functionality
   - Toggle completion
   - Filter options (All, Active, Completed)

2. Write comprehensive UI tests for:
   - Rendering todo items
   - Adding new todos
   - Deleting todos
   - Toggling completion
   - Filtering todos
   - Form interactions
   - Accessibility features

**Bonus Challenge**: Add drag-and-drop functionality and test it.

## 📝 Module Summary

In this module, you learned:
- ✅ React Testing Library query methods and their priority
- ✅ How to test complex UI interactions
- ✅ Debugging techniques with `screen.debug()`
- ✅ Accessibility-first testing practices
- ✅ Best practices for UI element testing

## 🎯 Next Steps

In the next module, we'll focus on testing user interactions and event handling.

---

**Ready for Module 6? Let's master user interaction testing! 🚀** 