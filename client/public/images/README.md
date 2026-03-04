# Static images

Place the Hero profile image here as **profile.jpg** so the homepage loads without calling the API.

If you have it in the server's `uploads` folder (e.g. `PassPhoto Without Chain.jpg`), copy it to this folder and rename to `profile.jpg`:

```bash
# From project root, if the file exists in server uploads:
cp "server/uploads/PassPhoto Without Chain.jpg" client/public/images/profile.jpg
```

Then commit and redeploy the Vercel site.
