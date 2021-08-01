try {
  const user = req.user
  if (!user.stripe_account_id) 
    const ResponsestripeAccount = await stripe.accounts.create
      if (I got a response with stripeAccount.id) {
        //updating User table
          user.stripe_account_id = stripeAccount.id
          const userUpdateResult = await db.User.update(
          //updating Stripe Table
          const stripeUpdateResult = await db.StripeData.create(
        }
  } else if user already has an account {
      //check if they are already setup
      retur res.status(401).send('ERR ---> Stripe Account Already Created')
  }
  //create strip onboarding link
  let accountLink = await stripe.accountLinks.create({
  //assigning additional data to prefill onboarding form
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
    "stripe_user[country]": user.country || undefined
  })
  //create link
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  //return the link
  res.status(201).send(link);
