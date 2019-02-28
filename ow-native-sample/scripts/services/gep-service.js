/**
 * Game Event Provider service
 * This will listen to events from the game provided by
 * Overwolf's Game Events Provider
 */
define(function () {

    // http://developers.overwolf.com/game_events_status/game_events_status/pubg/
    const REQUIRED_FEATURES = [
      // Event
      'death',
      'knockedout',
      'damage_dealt',
      'headshot',
      'kill',
      'killer',
      'matchEnd',
      'matchStart',
      'revived',
      // Info Update
      'headshots',
      'kills',
      'max_kill_distance',
      'total_damage_dealt',
      'location',
      'map',
      'mode',
      'name',
      'phase',
      'me',
      'total_teams',
      'roster',
      'nicknames'
    ];
    
    const REGISTER_RETRY_TIMEOUT = 10000;

    function registerToGEP() {

      // http://developers.overwolf.com/documentation/sdk/overwolf/games/events/#setrequiredfeatures
      overwolf.games.events.setRequiredFeatures(REQUIRED_FEATURES, function (response) {
        if (response.status === 'error') {
          setTimeout(registerToGEP, REGISTER_RETRY_TIMEOUT);
        } else if (response.status === 'success') {

          // http://developers.overwolf.com/documentation/sdk/overwolf/games/events/#onnewevents2
          overwolf.games.events.onNewEvents.removeListener(_handleGameEvent);
          overwolf.games.events.onNewEvents.addListener(_handleGameEvent);

          // http://developers.overwolf.com/documentation/sdk/overwolf/games/events/#oninfoupdates2
          overwolf.games.events.onInfoUpdates2.removeListener(_handleInfoUpdate);
          overwolf.games.events.onInfoUpdates2.addListener(_handleInfoUpdate);
        }
      });
    }

    async function _handleGameEvent(eventsInfo) {
      for (let eventData of eventsInfo.events) {
        console.log(eventData);
        overwolf.log.info("Event: " + eventData.name);
      }
    }

    async function _handleInfoUpdate(eventsInfo) {
      console.log(eventsInfo.info);
      overwolf.log.info("Info Update: " + eventsInfo.feature);
    }

    return {
      registerToGEP
    }
  });