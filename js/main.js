'use strict';

const Carousel = {
    init: function(settings = { bindTo: $('#myCarousel'), leftArrow: $('#leftArrow'), rightArrow: $('#rightArrow'), rotateInterval: 5000 }) {
        this.bindTo = settings.bindTo;
        this.bindTo.addClass('carousel');
        this.leftArrow = settings.leftArrow;
        this.leftArrow.addClass('left arrow');
        this.rightArrow = settings.rightArrow;
        this.rightArrow.addClass('right arrow');
        this.imageQueue = [...this.bindTo.find('img')];
        this.imageQueue.forEach((node) => $(node).hide());
        this.currentImage = this.imageQueue[0];
        this.rotateInterval = settings.rotateInterval;
        this.renderImage();
        this.autoRotateLoop = setInterval(() => { this.autoRotate() }, this.rotateInterval);
        this.leftArrow.click((event) => {
            clearInterval(this.autoRotateLoop);
            this.autoRotateLoop = setInterval(() => { this.autoRotate() }, this.rotateInterval);
            this.rotateLeft();
            event.preventDefault();
        });
        this.rightArrow.click((event) => {
            clearInterval(this.autoRotateLoop);
            this.autoRotateLoop = setInterval(() => { this.autoRotate() }, this.rotateInterval);
            this.rotateRight();
            event.preventDefault();
        });
    },
    renderImage: function() {
        $(this.previousImage).hide();
        $(this.currentImage).show();
    },
    rotateLeft: function() {
        this.imageQueue.unshift(this.imageQueue.pop());
        this.previousImage = this.currentImage;
        this.currentImage = this.imageQueue[0];
        this.renderImage();
    },
    rotateRight: function() {
        this.imageQueue.push(this.imageQueue.shift());
        this.previousImage = this.currentImage;
        this.currentImage = this.imageQueue[0];
        this.renderImage();
    },
    autoRotate: function() {
        this.rotateRight();
    }
};

const main = function() {
    const carousel = Object.create(Carousel);
    carousel.init();
};

$(document).ready(main);
