# CUTE CHAT CLIENT DOCUMENTATION

### Requirements

`NodeJS v20.0~`

### Steps for running the app

* #### Clone the github repository
```shell
git clone https://github.com/ramoneitor439/cute-chat-client.git
```

* #### Run following commands
```shell
npm install
npm run dev
```

# REPOSITORY STANDARDS

### Commits

* Each commit must only change from **1** to **10** files at most

* Each commit must refer only to **one** functionality

### All commits must be created following the next structure

`<type>(<component>): "<description>"`

#### Type:

* `feat`: It is used for new changes, functionalities or entities
* `fix`: It is used for bug fixes or error correction.
* `refactor`: It is used to reimplement functionalities or improve the code.

#### Component:

It refers to the specific component where the changes were made

`Examples`: `Button`, `Footer`, `Loading`


#### Description:

A brief but explanatory description of the changes contained in the commit

`Example`: `Add custom input fields to the main container`

#### Final result:

`feat(CustomForm): Add custom input fields to the main container`