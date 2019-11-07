FROM ruby:2.6.5-alpine
RUN apk add --update --no-cache bash build-base nodejs sqlite-dev tzdata postgresql-dev yarn
RUN gem install bundler:2
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock package.json yarn.lock ./
RUN yarn install --check-files
RUN bundle install
COPY . .

# Add a script to be executed every time the container starts.
EXPOSE 5455

# Start the main process.
ENV PATH=./bin:$PATH
