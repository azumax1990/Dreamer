web: bundle exec puma -C config/puma.rb && PORT=3001 yarn start
api: PORT=3000 && bundle exec rails s
release: bundle exec rake db:migrate