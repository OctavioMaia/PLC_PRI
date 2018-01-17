// PHOTO ============================
    app.get('/newPhoto', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Path','obligatory':true},
                      {'type':'text','text':'People','obligatory':false}];
        var name = 'Photo';
        res.render('processnewpost',{ title: 'Photo',name,reqs,extras});
    });

    // SPORTS REGISTRY ============================
    app.get('/newSportsRegistry', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Sport','obligatory':true},
                      {'type':'text','text':'Duration','obligatory':true},
                      {'type':'text','text':'gpxFile','obligatory':false},
                      {'type':'text','text':'Participants','obligatory':false},
                      {'type':'text','text':'Results','obligatory':false},];
        var name = 'Sports Registry';
        res.render('processnewpost',{ title: 'Sports Registry',name,reqs,extras});
    });

    // ACADEMIC REGISTRY ============================
    app.get('/newAcademicRegistry', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Duration','obligatory':false},
                      {'type':'text','text':'Credits','obligatory':true}];
        var name = 'Academic Registry';
        res.render('processnewpost',{ title: 'Academic Registry',name,reqs,extras});
    });

    // EVENT ============================
    app.get('/newEvent', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Files','obligatory':true},
                      {'type':'text','text':'Guests','obligatory':false},
                      {'type':'text','text':'Hosts','obligatory':false},
                      {'type':'text','text':'Event Type','obligatory':true},
                      {'type':'text','text':'Text','obligatory':false}];
        var name = 'Event';
        res.render('processnewpost',{ title: 'Event',name,reqs,extras});
    });

    // THOUGHT ============================
    app.get('/newTought', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Key Words','obligatory':true},
                      {'type':'text','text':'Text','obligatory':true}];
        var name = 'Thought';
        res.render('processnewpost',{ title: 'Thought',name,reqs,extras});
    });

    // IDEA ============================
    app.get('/newIdea', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Key Words','obligatory':true},
                      {'type':'text','text':'Priority','obligatory':true},
                      {'type':'text','text':'Text','obligatory':true}];
        var name = 'Idea';
        res.render('processnewpost',{ title: 'Idea',name,reqs,extras});
    });
    
    // NEW RECIPE ==============================
    app.get('/newRecipe', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Ingredients','obligatory':true},
                      {'type':'text','text':'Instructions','obligatory':true}];
        var name = 'Recipe';
        res.render('processnewpost',{ title: 'Recipe'});
    });

    // NEW BIRTH ============================
    app.get('/newBirth', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Child Name','obligatory':true},
                      {'type':'text','text':'Child Gender','obligatory':true},
                      {'type':'text','text':'Parents','obligatory':true}];
        var name = 'New Birth';
        res.render('processnewpost',{ title: 'New Birth',name,reqs,extras});
    });

    // NEW WEDDING ============================
    app.get('/newWedding', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Couple','obligatory':true},
                      {'type':'text','text':'Guests','obligatory':true},
                      {'type':'text','text':'Menu','obligatory':false}];
        var name = 'Wedding';
        res.render('processnewpost',{ title: 'Wedding',name,reqs,extras});
    });

    // NEW ACADEMIC WORK ============================
    app.get('/newAcademicWork', function(req, res) {
        var reqs = [{'type':'text','text':'Type','obligatory':true},
                    {'type':'text','text':'Location','obligatory':false},
                    {'type':'text','text':'Privacy','obligatory':true},
                    {'type':'text','text':'Title','obligatory':true},
                    {'type':'date','text':'Date','obligatory':true},
                    {'type':'text','text':'Description','obligatory':true}];
        var extras = [{'type':'text','text':'Course','obligatory':true},
                      {'type':'text','text':'Professor','obligatory':true},
                      {'type':'text','text':'Ficheiro','obligatory':true},
                      {'type':'text','text':'Classification','obligatory':true}];
        var name = 'Academic Work';
        res.render('processnewpost',{ title: 'Academic Work',name,reqs,extras});
    });