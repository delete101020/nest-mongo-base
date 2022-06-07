# SOCIAL AUTH

## FACEBOOK

- Access <https://developers.facebook.com/>

- `My apps` > `Create app`

- `My apps` > `<your_app_name>`

- `Products` > **Facebook Login** > `Quick start` > `Web`

- Enter **Site URL:** <http://localhost:3000/> > `Save`

- `Settings` > `Basic` > **App ID / App secret** (env)

## LINKEDIN

- Create LinkedIn page: <https://www.linkedin.com/company/setup/new/>

- Access <https://developer.linkedin.com/>

- `Create app`

- `My apps` > `<your_app_name>`

- `Auth` > `Application credentials` > **ClientId / Client secret** (env)

- `OAuth 2.0 settings` > Edit > `<your_domain>/<callback_endpoint>`. Ex: <http://localhost:3000/api/v1/auth/linkedin/callback>

- `Products` > **Sign In with LinkedIn** > `Select`

- `Products` > **Share on LinkedIn** > `Select`

## GOOGLE

- Access <https://console.developers.google.com/>

- Go to `OAuth consent screen` > `External` > `Create`

- Go to `Credentials` > `Create credentials` > `OAuth client ID` > **Client ID / Client secret** (env)

- Enter **Application type:** `Web application`

- Enter **Authorized JavaScript origins:** `<your_domain>`

- Enter **Authorized redirect URIs:** `<your_domain>/<callback_endpoint>`. Ex: <https://3876-171-239-130-148.ngrok.io/api/v1/auth/google/callback>
