## Mobile Quizz

1. What would return the following code?

```jsx
class Content extends React.Component {
  render() {
    return (
      <>
        <Text>Hello</Text>
        <Text>World</Text>
      </>
    );
  }
}

class Container extends React.Component {
  render() {
    return (
      <ScrollView>
        <View>
          <Content />
        </View>
      </ScrollView>
    );
  }
}
```
- B
	```jsx
	<ScrollView>
	  <View>
	    <Text>Hello</Text>
	    <Text>World</Text>
	  </View>
	</ScrollView>
	```

2. Which reducer code do not follow best practices?

- B
	```ts
	case ADD_CONTACT:
	    return {
	        ...state,
	        contacts: [...state.contacts, "450282"]
	    }
	```


3. Which reducer code is correct?

- A)
	```ts
	export function userSetData(
	  state: IUserState,
	  action: UserSetDataAction,
	): IUserState {
	  const { data, authType } = action
	
	  return { ...state, data, authType, loading: false }
	}
	```

4. A higher-order component is a function that:

	- A) takes a component and returns a new component

5. What is "windowing"?

	- B) a technique to render a small subset of a larger dataset

6. Which methods are not usable with React hooks?

	- A) getDerivedStateFromError
	- B) componentWillUnmount
	- C) componentDidUpdate

7. Which status code is not an error?

	- A) 204
	- D) 200

8. Use Typescript to describe the following function which returns a success message when the request has been successfully sent, returns a code status when the request has failed.

	```ts
	/* Usage */ 
	const messageOrCodeStatus = await registerUser("Laurent", 35);
	```

	```ts
	type RegisterUserResult =
  		| { type: "success"; message: string }
  		| { type: "error"; statusCode: number };

	type RegisterUser = (name: string, age: number) => Promise<RegisterUserResult>;
	```

	Or, more elegant way:

	```ts
	type Flatten<T> = {
  		[K in keyof T]: T[K];
	} & {};

	type EnhancedDiscrimatedUnion<T extends Record<string, object>> = {
  		[K in keyof T]: Flatten<T[K] & { type: K }>;
	}[keyof T];

	type RegisterUserResult = EnhancedDiscrimatedUnion<{
  		success: { message: string };
  		error: { statusCode: number };
	}>;
	```
	
9. What is the main difference between queries and mutations in GraphQL? 

- Queries are used to read data from server and mutations are used to create, edit or delete data.

10. What does not permit to interact with servers within React Native project?

- C) SwiftUI