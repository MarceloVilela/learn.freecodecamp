/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const MONGODB_CONNECTION_STRING = process.env.DB;

var db = null;
MongoClient.connect(MONGODB_CONNECTION_STRING, function (err, con) {
  db = con;
});

const badRequestCode = 200;

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      var project = req.params.project;
      var additionalParams = req.query;

      var filter = { project, ...additionalParams };

      if('_id' in filter){
        filter['_id'] = new ObjectId(filter['_id']);
      }

      db.collection('issue').find(filter).toArray(
        function (err, results) {
          if (err) return res.status(badRequestCode).json({ err });

          return res.json(results);
        });
    })

    .post(function (req, res) {
      var project = req.params.project;
      var {
        issue_title,
        issue_text,
        created_by,
        assigned_to = '',
        status_text = '',
        open = true
      } = req.body;

      var objectToInsert = {
        project,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open: Boolean(open),
        created_on: new Date(),
        updated_on: null
      };

      var requiredFields = [
        'project',
        'issue_title',
        'issue_text',
        'created_by'
      ];

      const missingFields = requiredFields
        .filter(field => objectToInsert[field] === undefined)
        .map(field => `Missing field: ${field}`);

      if (missingFields.length > 0) {
        //return res.status(badRequestCode).json(missingFields);
        return res.json({ error: 'required field(s) missing' });
      }

      db.collection('issue').insert(
        objectToInsert,
        function (err) {
          if (err) return res.status(badRequestCode).send('');

          return res.json(objectToInsert);
        });
    })

    .put(function (req, res) {
      var project = req.params.project;
      var {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open,
      } = req.body;

      const propsReceived = {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open
      };

      Object.keys(propsReceived).forEach(prop => {
        if (propsReceived[prop] === undefined) {
          delete propsReceived[prop];
        }
      });

      if (!_id) {
        return res.json({ error: 'missing _id', '_id': _id });
      }

      if (Object.keys(propsReceived).length === 0) {
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }

      try {
        const objectID = ObjectId(_id)
      } catch (error) {
        res.status(badRequestCode).json({ error: 'could not update', '_id': _id });
      }

      propsReceived['updated_on'] = new Date().toISOString();

      db.collection('issue').find({ _id: ObjectId(_id) }).toArray(
        function (err, results) {
          if (err) return res.status(badRequestCode).json({ error: 'could not update', '_id': _id });

          var [objectFound] = results;

          if (!objectFound) return res.status(badRequestCode).json({ error: 'could not update', '_id': _id });

          var objectToUpdate = Object.assign(objectFound, propsReceived);
          delete objectToUpdate['_id'];

          db.collection('issue').updateOne(
            { _id: new ObjectId(_id) },
            objectToUpdate,
            function (err) {
              if (err) return res.status(badRequestCode).json({ error: 'could not update', '_id': _id });

              return res.json({ result: 'successfully updated', '_id': ObjectId(_id) });
            });
        });
    })

    .delete(async function (req, res) {
      var {
        _id
      } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        const objectID = ObjectId(_id)
      } catch (error) {
        res.status(badRequestCode).json({ error: 'could not delete', '_id': _id });
      }

      var filter = { _id: ObjectId(_id) };

      db.collection('issue').find(filter).toArray(
        function (err, results) {
          if (err) return res.status(badRequestCode).json({ error: 'could not delete', '_id': _id });

          var [objectFound] = results;
          if (!objectFound) return res.status(badRequestCode).json({ error: 'could not delete', '_id': _id });

          db.collection('issue').deleteOne(
            filter,
            function (err) {
              if (err) return res.status(badRequestCode).json({ error: 'could not delete', '_id': _id });

              return res.status(200).json({ result: 'successfully deleted', '_id': _id });
            });
        });
    });

};
